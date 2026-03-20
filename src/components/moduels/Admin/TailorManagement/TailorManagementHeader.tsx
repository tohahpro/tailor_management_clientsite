/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { getAllTailors } from "@/services/admin/tailor.service";
import { useEffect, useState } from "react";

const TailorManagementHeader = () => {

    const [, setUser] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const UserResult = await getAllTailors();
            setUser(UserResult); 
        }
        fetchData();
    }, []);


    return (
        <>          
            <ManagementPageHeader
                title="Tailor Management"
                description="Manage tailor information and details"                
            />
        </>
    );
};

export default TailorManagementHeader;