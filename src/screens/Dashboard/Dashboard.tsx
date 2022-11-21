import React, { useCallback, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import useProfiles from '../../hooks/useProfiles';
import styles from './Dashboard.module.css';

const Dashboard:React.FC = () => {
    const [page, setPage] = useState(1);
    const observerRef = useRef<any>();

    const {
        loading,
        hasMore,
        profiles,
        error
    } = useProfiles({
        page
    });

    const lastProfileRef = useCallback((node:any)=>{
        if(loading) return;
        if(observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting && hasMore){
                setPage(prev=>prev+1);
            }
        })
        if(node){
            observerRef.current.observe(node);
        }
    },[loading, hasMore]);

    return (
        <>
            <div className={`${styles.head} bg-primary`}>
                <div className={styles.title}>
                    Sky Avataaars
                </div>
            </div>
            <div className={`${styles.profileContainer} container`}>
                {profiles.map((profile, index)=>{
                    if(profiles.length === index+1){
                        return (
                            <div 
                                ref={lastProfileRef}
                                className={styles.profileItem} 
                                key={profile.id}
                            >
                                <Avatar url={profile.url}/>
                                <div className={styles.name}>
                                    {profile.name}
                                </div>
                            </div>
                        )
                    }else{
                        return (
                            <div className={styles.profileItem} key={profile.id}>
                                <Avatar url={profile.url}/>
                                <div className={styles.name}>
                                    {profile.name}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            {loading && (
                <div className={styles.loadingContainer}>
                    <Spinner animation="grow" variant="primary" size='sm'/>
                    <Spinner animation="grow" className="mx-1" variant="primary" />
                    <Spinner animation="grow" variant="primary" size='sm' />
                </div>
            )}
            {error && (
                <div className='pb-3 text-danger text-center'>
                    Something went wrong!
                </div>
            )}
        </>
    )
}

export default Dashboard;
