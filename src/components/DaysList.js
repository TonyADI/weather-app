import { Day } from './Day';
export const DaysList = props => {
    return (
        <div id="days">
            {props.days ? 
                props.days.map(day => {
                    return <Day 
                                condition={props.condition}
                                max={props.max}
                                min={props.min}
                    />}) : 
            null}
        </div>
    );
}
