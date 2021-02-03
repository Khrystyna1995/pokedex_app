import React, {useState} from 'react';


function ShowInfo(component, show = false) {
    const [showPokemonInfo, setShowPokemonInfo] = useState(() => show);
    return(
        [showPokemonInfo ? component : null, () => setShowPokemonInfo((v) => !v) ]
    )
}

export default ShowInfo;
