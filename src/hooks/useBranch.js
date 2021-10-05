import {useState, useEffect} from "react";

export const useBranch = () => {
    const [branchData, setBranchData] = useState(null);
    const [branchError, setBranchError] = useState(null);
    const [branchInProgress, setBranchInProgress] = useState(false);

    useEffect(() => {
        //fetchData() 선언부
        const fetchData = async () => {
            try {
                setBranchInProgress(true);
                //get all
                const res = await fetch("http://54.180.38.125:8000/branches/");
                const result = await res.json();
                // console.log(result)
                if (res.ok) {
                    setBranchData(result);
                    setBranchError(null);
                    // console.log("res:" + res.ok);
                } else {
                    console.log("에러 발생")
                    throw result;
                }
            } catch (branchError) {
                setBranchError(branchError);
            } finally {
                setBranchInProgress(false);
            }
        };
        //fetchData() 호출부
        fetchData();
    }, []);
    return {branchData, branchError, branchInProgress};
};
