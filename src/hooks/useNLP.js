import {useEffect, useState} from "react";

const URL = 'http://54.180.38.125:8000/nlp/'


const useNLP = () => {
    const [result, setResult] = useState(null);
    const [sentence, setSentence] = useState(null);

    useEffect(() => {
        if(!sentence)return;
        const fetchSentence = async () => {
            try {
                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        sentence: sentence,
                    }),
                };
                const res = await fetch(URL, options);
                if (res.ok) {
                    const parsedRes = await res.json();
                    console.log('parsedRes: ', parsedRes)
                    setResult(parsedRes);
                } else throw res;
            } catch (e) {
                console.error(e)
            }
        }
        fetchSentence();
    }, [sentence]);
    return [result, setSentence];
};

export default useNLP;
