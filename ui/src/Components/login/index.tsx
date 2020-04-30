import React from 'react'

export default function Login() {
    return (
    <div className="container">
        <div className="row">
            <div className="column">
                <form>
                <fieldset>
                    <label htmlFor="masterNode">Masternode</label>
                    <select>
                        <option value="1">Node 1: US</option>
                    </select>
                    <label>User</label>
                    <input type="text" placeholder="mqtt-test"/>
                    <label>Password</label>
                    <input type="password"/>
                    <label htmlFor="commentField">Connection</label>
                    <div className="example-send-yourself-copy">
                    <input type="checkbox" id="confirmField"/>
                    <label className="label-inline" htmlFor="confirmField">use TLS encryption</label>
                    </div>
                    <input className="button-primary" type="submit" value="Send"/>
                </fieldset>
                    <blockquote>
                        <p><em>Use with discretion</em></p>
                    </blockquote>
                </form>
            </div>
        </div>
    </div>
    )
}