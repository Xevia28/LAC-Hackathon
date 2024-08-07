import React, { useState } from "react";
import axios from "axios";
import { Puff } from 'react-loader-spinner';

export default function IPFS() {
    const [files, setFiles] = useState([]);
    const [ipfsPath, setIpfsPath] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (files.length > 0) {
            try {
                const formData = new FormData();
                files.forEach(file => {
                    formData.append("file", file, file.webkitRelativePath || file.name);
                });

                setLoading(true);
                const resFile = await axios({
                    method: "POST",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: "4e2e0b082a3a7a7624d3",
                        pinata_secret_api_key: "f9ccf3142e278df713936a3a8032d7c2e5b5336543a884f4b44e40b707ddba35",
                        "Content-Type": "multipart/form-data"
                    }
                });

                setLoading(false);
                const folderHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;
                setIpfsPath(folderHash);
            } catch (err) {
                alert("Unable to upload folder to Pinata");
                console.log(err);
            }
        } else {
            alert("No folder selected");
        }
    }

    const handleFiles = (e) => {
        e.preventDefault();
        setFiles(Array.from(e.target.files));
    }

    return (
        <div className="App">
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Puff color="#00BFFF" height={550} width={80} />
                </div>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="form">
                        <input type="file" webkitdirectory="true" directory="true" onChange={handleFiles} />
                        <input className="btn-upload" type="submit" value="Upload Folder" />
                    </form>
                    <p>IPFS path: <a href={ipfsPath}>{ipfsPath}</a></p>
                </>
            )}
        </div>
    );

}