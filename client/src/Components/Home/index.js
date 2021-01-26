import React, { useEffect, useState } from "react";
import axios from "axios";
import Particle from './Paricule';
import { Input } from "semantic-ui-react";
import { Spinner } from "react-bootstrap"

export default () => {
    const [currencys, setCurrencys] = useState([]);
    const [filter, setFilter] = useState("");
    const [montant, setMontant] = useState(1);

    const getCurrency = () => {
        var config = {
            method: 'get',
            url: 'http://api.currencylayer.com/live?access_key=c4f3981f005d1980e0def9cf45cfdf39&format=1',
            headers: {
                'Cookie': '__cfduid=d84c305f4d1a3d2652d2719a441afd97d1609106208'
            }
        };

        axios(config)
            .then(function (response) {
                const usdCurr = Object.entries(response.data.quotes);
                const { USDTND } = response.data.quotes;
                setTimeout(() => {
                    setCurrencys(usdCurr.map(([key, value]) => {
                        return { key: key.slice(3), value: value / USDTND }
                    }))

                }, 1000)

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const Money = ({ k, val, width }) => <div
        style={{
            width,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <div style={{ fontSize: 22 }}>
            {val}
        </div>
        <div style={{ fontSize: 12, marginTop: 4 }}>
            {k}
        </div>
    </div>
    useEffect(getCurrency, []);
    return <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        textAlign: "center",
        height: "100%",
        background: "#222",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
        paddingBottom: "100vh",
    }}>
        <Particle />
        <div style={{
            display: "flex",
            color: "white",
            fontWeight: 600,
            width: 300,
            justifyContent: "space-between",
            margin: 8
        }}>
            Montant :
        <Input
                value={montant}
                onChange={(e) => {
                    setMontant(e.target.value);
                }}
                style={{ width: 100 }}
            ></Input>

        </div>
        <div style={{
            display: "flex",
            color: "white",
            fontWeight: 600,
            width: 300,
            justifyContent: "space-between",
            margin: 8
        }}>
            Recherche :
        <Input
                value={filter}
                onChange={(e) => {
                    setFilter(e.target.value);
                }}
                style={{ width: 100 }}
            ></Input>
        </div>

        {currencys.length == 0 ?
            <Spinner animation="border" role="status" style={{ color: "white" }} />
            :
            currencys
                .filter((c, i) => filter.length > 0 ? c.key.includes(filter.toUpperCase()) : i < 20)
                .map(c => <div style={{
                    width: 300,
                    height: 42,
                    background: "#e3f2fd",
                    borderRadius: "8px",
                    boxShadow: "-5px -2px 20px 0px rgba(0,0,0,0.39)",
                    display: "flex",
                    justifyContent: "space-between",
                    margin: 16
                }}>
                    <Money k='TND' val={montant} width="30%" />
                    <Money k={c.key} val={montant * Math.round(c.value * 1000) / 1000} width="70%" />
                </div>
                )}
    </div >

}