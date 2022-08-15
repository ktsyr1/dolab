

import { Input } from "/lib";
import Head from "next/head";
import cookie from "cookie";
import { Component, useContext, useState } from "react";
import Forms from "/theme/forms";
import BrandContext from "/lib/context/brand";
import { PencilOutline, TrashOutline } from "react-ionicons";
import { Title } from "../../lib";
import axios from "axios";
// nextjs useing routes 

export default class BrandsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.Send = this.Send.bind(this);
    }
    Send() {
        axios.post('/api/lang', this.state)
    }
    render() {
        return (
            <BrandContext.Provider value={this.state}>
                <div className="box col w-full  ">
                    <Head>
                        <title>lang</title>
                    </Head>
                    <Title title='lang' ui />
                    <Forms title='lang' type send={this.Send}>
                        <Input type="text" name="key" placeholder="key" required title="key" req onChange={(e) => this.setState({ key: e.target.value })} />
                        <Input type="text" name="en" placeholder="en" required title="en" onChange={(e) => this.setState({ en: e.target.value })} />
                        <Input type="text" name="ar" placeholder="ar" required title="ar" onChange={(e) => this.setState({ ar: e.target.value })} />
                    </Forms>
                </div>
            </BrandContext.Provider >
        );
    }
} 