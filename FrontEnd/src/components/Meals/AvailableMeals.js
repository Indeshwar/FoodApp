import {useEffect, useState} from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import httpCommon from '../../service/http-common'

const   AvailableMeals= (props) => {
    const[meals, setMeals] = useState([]);
    const[isLoading, setLoading] = useState(true);
    const[httpError, setHttpError] = useState();

    const fetchData = ()=>{

        httpCommon.get('/all').then((res)=>{
            console.log('Fetched data ', res);
            setMeals(res.data);
            setLoading(false);

        }).catch(err=>{
            setLoading(false);
            setHttpError(true);
        });
    }

    useEffect(()=>{
        fetchData()
        
    }, []);

    if(isLoading){
        return <section className={classes.mealsLoading}>
            <p>Loading.......</p>
        </section>
    }

    if(httpError){
        return <section className={classes.httpError}>
            <p>Something went wrong!</p>
        </section>
    }

    const mealList = meals.map(meal=><MealItem 
        key={meal.id} id = {meal.id} name = {meal.name} description = {meal.description} price = {meal.price} />);
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealList}</ul>
            </Card>
               
        </section>
    )
}

export default  AvailableMeals;
