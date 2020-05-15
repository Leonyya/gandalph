package main

import (
	"bytes"
	"fmt"
	"log"
	"os"
	"os/exec"
	"time"

	"github.com/Equanox/gotron"
	MQTT "github.com/eclipse/paho.mqtt.golang"
)

var f MQTT.MessageHandler = func(client MQTT.Client, msg MQTT.Message) {
	fmt.Printf("TOPIC: %s\n", msg.Topic())
	fmt.Printf("MSG: %s\n", msg.Payload())
}

func startX() {
	// Create a new browser window instance"
	window, err := gotron.New("ui/build")
	if err != nil {
		panic(err)
	}

	// Alter default window size and window title.
	window.WindowOptions.Width = 450
	window.WindowOptions.Height = 700
	window.WindowOptions.Title = "Gotron"

	// Start the browser window.
	// This will establish a golang <=> nodejs bridge using websockets,
	// to control ElectronBrowserWindow with our window object.
	done, err := window.Start()
	if err != nil {
		panic(err)
	}

	// Open dev tools must be used after window.Start
	// window.OpenDevTools()

	// Wait for the application to close
	<-done
}
func buildUI() {
	cmd := "npm"
	args := []string{"run", "build"}
	process := exec.Command(cmd, args...)
	process.Dir = "./ui/"
	stdin, err := process.StdinPipe()
	if err != nil {
		fmt.Println(err)
	}
	defer stdin.Close()
	buf := new(bytes.Buffer) // THIS STORES THE NODEJS OUTPUT
	process.Stdout = buf
	process.Stderr = os.Stderr

	if err = process.Start(); err != nil {
		fmt.Println("An error occured: ", err)
	}

	process.Wait()
	fmt.Println("Generated string:", buf)

}
func main() {
	MQTT.DEBUG = log.New(os.Stdout, "", 0)
	MQTT.ERROR = log.New(os.Stdout, "", 0)
	opts := MQTT.NewClientOptions().AddBroker("tcp://iot.eclipse.org:1883").SetClientID("gotrivial")
	opts.SetKeepAlive(2 * time.Second)
	opts.SetDefaultPublishHandler(f)
	opts.SetPingTimeout(1 * time.Second)

	c := MQTT.NewClient(opts)
	if token := c.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}
	if token := c.Subscribe("go-mqtt/sample", 0, nil); token.Wait() && token.Error() != nil {
		fmt.Println(token.Error())
		os.Exit(1)
	}

	for i := 0; i < 5; i++ {
		text := fmt.Sprintf("this is msg #%d!", i)
		token := c.Publish("go-mqtt/sample", 0, false, text)
		token.Wait()
	}

	time.Sleep(6 * time.Second)

	if token := c.Unsubscribe("go-mqtt/sample"); token.Wait() && token.Error() != nil {
		fmt.Println(token.Error())
		os.Exit(1)
	}

	c.Disconnect(250)

	time.Sleep(1 * time.Second)
	buildUI()
	startX()
}
