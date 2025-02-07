function HymnPlayer({ audioSrc }) {
    if (!audioSrc) return <p>Audio no disponible.</p>;

    return (
        <div>
            <audio controls>
                <source src={audioSrc} type="audio/mpeg" />
                Votre navigateur ne prend pas en charge l'élément audio.
            </audio>
        </div>
    );
}

export default HymnPlayer;
