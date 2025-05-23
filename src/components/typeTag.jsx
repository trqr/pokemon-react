import '../styles/typeTag.css';

export function TypeTag({type, onClickFunction}){
    
    return (
        <div 
            className={"button is-link is-medium is-hovered tag tag-"+type}
            onClick={ () => onClickFunction(type) }
        >
            {type}
        </div>
    );
}
