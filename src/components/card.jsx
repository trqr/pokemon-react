import { type } from '@testing-library/user-event/dist/type';
import '../styles/card.css';


function Card({pokemon, onClickFunction}) {
    console.log(pokemon);

    const type1 = pokemon.types[0].type.name;
    const type2 = () => pokemon.types[1]?.type?.name || "none";

    function playAudio(){
        const audio = new Audio(pokemon.cries.latest);
        audio.play();
    }

    function imgHover(e){
        e.target.src = pokemon.sprites.other.showdown.front_shiny;
    }

    function imgHoverEnd(e){
        e.target.src = pokemon.sprites.other.showdown.front_default;
    }

  return (  
    <div className={"card card-" + type1} >
        <div class="card-image">
            <figure class="image is-4by3">
            <img
                src={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other.home.front_default}
                alt="Placeholder image"

            />
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
            <div class="media-left">
                <figure class="image is-48x48">
                <img
                    src={pokemon.sprites.other.showdown.front_default}
                    alt="Placeholder image"
                onMouseEnter={imgHover}
                onMouseLeave={imgHoverEnd}
                />
                </figure>
            </div>
            <div class="media-content">
                <p class="title is-4">{pokemon.name}</p>
                <p class="subtitle is-6">#{pokemon.id}</p>
            </div>
            </div>

            <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
            iaculis mauris. <a onClick={ () => onClickFunction(type1)}>#{type1}</a> <a href="#">#{type2()}</a>
            <br />
            <div class="bottom-card">
                <button class="button is-primary">Check stats</button>
                <button onClick={playAudio} class="button is-small">
                    <span class="icon material-symbols-outlined">
                    play_circle
                    </span>
                </button>
            </div>
            </div>
        </div>
    </div>
  );
}

export default Card;