
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

function ResultPage({coordinates}) {

    const localStorageName = 'attractions';
    const maxKm = 40;

    const [attractionList, setAttractionList] = useState([]);
    const [filteredAttractionList, setFilteredAttractionList] = useState([]);
    const [attractionTypes, setAttractionTypes] = useState([]);
    const [error, setError] = useState(false);

    //get data
    useEffect(()=>{
        getData().then(result => {
            initList(result);
        }).catch(()=> setError(true));
    },[]);

    const getData = async () => {
        const response = await fetch(`/getData?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`);
        const result = await response.json();
        return result.data;
    }

    const initList =(result) =>{
        //set attraction types;
        const attractionTypesData = result.filter( item =>  item.Distance <= maxKm)?.map(item => item.Attraction_Type);
        setAttractionTypes([...new Set( attractionTypesData.join(';').split(';'))]);
        //get data of favorites attractions
        let jsonData = window.localStorage.getItem(localStorageName);
        jsonData = JSON.parse(jsonData);
        const updatedResult = Object.keys(jsonData).length>0 ?
                result.map(item => ({...item,favorite:jsonData.includes(item.Id)} )):
                [...result];
        setAttractionList(updatedResult);
        setFilteredAttractionList(updatedResult);
    }

    function displayAttractionsTypesList(type) {
       const newList = attractionList.filter( item => (item.Attraction_Type.indexOf(type)>=0 &&  item.Distance <= maxKm));
       setFilteredAttractionList(newList);
    }

    const updateFavorites =( index )=>{
        const updatedList = [...attractionList];
        updatedList[index].favorite = !updatedList[index].favorite;
        //update preview list
        setAttractionList(updatedList);
        setFilteredAttractionList(updatedList);
        //update local storage
        const favoritesList = updatedList.filter( item => item.favorite).map(item=>item.Id);
        window.localStorage.setItem(localStorageName, JSON.stringify(favoritesList));
    }

    return (
        <div className='result'>
           <Link to={'/'}>חזרה</Link>
            {filteredAttractionList.length > 0 && <>
            <div className='categories'>
                <div className='bold'>קטגוריות אטרקציות הנמצאות במרחק פחות מ-{maxKm} ק''ם:</div>
                {attractionTypes.map((item,index) => (
                    <div key={index} className='link' onClick={()=>displayAttractionsTypesList(item)} >{item}</div>
                    )
                )}
                <div className='link bold' onClick={()=>setFilteredAttractionList(attractionList)}>לכל הקטגוריות</div>
            </div>
            <div className={'grid-container'}>
                <div className='grid-row header'>
                    <div></div>
                    <div>שם אטרקציה</div>
                    <div>מס׳ אטרקציה</div>
                    <div>כתובת</div>
                    <div>שעות פתיחה</div>
                    <div>מרחק</div>
                    <div>אתר האטרקציה</div>
                </div>
                {filteredAttractionList.map((item, index) => (
                    <div key={item.Id} className='grid-row'>
                        <div>
                            <tooltip title={item.favorite ? 'הורד מהמועדפים':'הוסף למועדפים'}>
                                <div onClick={()=> updateFavorites(index)} className={`dot ${item.favorite ? 'active':'not-active'}`} />
                            </tooltip>
                             </div>
                            <div>{item.Name}</div>
                            <div>{item.Id}</div>
                            <div>{item.Address}</div>
                            <div dangerouslySetInnerHTML={{__html: `${item.Opening_Hours}`}}></div>
                            <div>{item.Distance} ק''מ</div>
                            <div><div className='url'><a className='url' href={item.URL}>{item.URL}</a> </div></div>
                        </div>
                        )
                    )}
            </div>
           </> 
           }
           {error && <div className='txt error'>לא נמצאו אטרקציות לתצוגה :(, נא לחזור לעמוד הראשי </div>}
    </div>
  );
}

export default ResultPage;