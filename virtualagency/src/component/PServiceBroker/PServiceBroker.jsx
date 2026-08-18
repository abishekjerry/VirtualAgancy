import React, { useEffect, useRef, useState } from "react";
import {
    Backdrop,
    Box,
    Button,
    Typography
} from "@mui/material";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import RefreshIcon from "@mui/icons-material/Refresh";
import PTypography from "../PTypography/PTypography";
import PButton from "../PButton/PButton";

const PServiceBroker = () => {
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const currentVersion = useRef(null);

    const checkVersion = async () => {
        try {
            const versionUrl = new URL(`version.json?_=${Date.now()}`,document.baseURI).href;
            const response = await fetch(versionUrl ,{cache: "no-store"});
            if (!response.ok) return;
            const data = await response.json();
            if (!data?.version) return;
            if (currentVersion.current === null) {
                currentVersion.current = data.version;
                return;
            }
            if (currentVersion.current !== data.version) {
                setUpdateAvailable(true);
            }
        } catch (error) {
            
        }
    };

    useEffect(() => {
        checkVersion();
        const interval = setInterval(checkVersion, 30000);
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                checkVersion();
            }
        };
        document.addEventListener("visibilitychange",handleVisibilityChange);
        return () => {
            clearInterval(interval);
                document.removeEventListener("visibilitychange",handleVisibilityChange);
        };
    }, []);

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <Backdrop
            open={updateAvailable}
            sx={{
                zIndex: 999999,
                backgroundColor: "rgba(255, 255, 255, 0.95)"
            }}
        >
            <Box sx={{ width: 380, maxWidth: "90%", p: 4, textAlign: "center", backgroundColor: "#fff",
                    borderRadius: 2, border: "1px solid #e0e0e0", boxShadow: 3 }}>
                <SystemUpdateAltIcon
                    sx={{
                        fontSize: 45,
                        color: "#8b5cf6"
                    }}
                />

                <PTypography 
                   labelText="New Version Available"
                    sx={{
                        mt: 2,
                        fontWeight: 600
                    }}
                />
                 <PTypography 
                   labelText=" A new version is available. Please refresh to continue."
                    sx={{
                        mt: 2,
                        fontWeight: 600
                    }}
                />
                <PButton
                    label={"Refresh & Continue"}
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                    sx={{
                        mt: 3,
                        textTransform: "none"
                    }}
                    
                /> 
            </Box>
        </Backdrop>
    );
};

export default PServiceBroker;