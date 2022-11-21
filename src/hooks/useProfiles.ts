import {useState, useEffect} from 'react';
import axios from 'axios';

interface ProfileType{
    id: number;
    name: string;
    url: string;
}

const useProfiles = ({
    page
}: {page:number}) => {
    const [profiles, setProfiles] = useState<ProfileType[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{
        setLoading(true);
        setError(false);
        axios({
            method: 'GET',
            url: "https://my-json-server.typicode.com/gagandeepchauhan/fake-profiles/profiles",
            params: {
                _limit: 5,
                _page: page
            }
        }).then((res) => {
            console.log(res.data);
            setProfiles((prevProfiles) => {
                if(page === 1){
                    return [...res.data];
                }
                return [...prevProfiles, ...res.data];
            });
            setHasMore(res.data?.length > 0);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            if(err){
                setError(true);
            }
        })
    },[page]);

    return {
        loading,
        error,
        hasMore,
        profiles
    }
}

export default useProfiles;