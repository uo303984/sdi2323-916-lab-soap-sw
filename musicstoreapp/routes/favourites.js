
const {ObjectId} = require("mongodb");
module.exports = function (app,favouriteSongsRepository,songsRepository){

    app.get('/songs/favourites', async (req, res) => {
        try {
            const favourites = await favouriteSongsRepository.listFavourites();

            const totalPrice = favourites.reduce((total, favourite) => total + parseFloat(favourite.price), 0);


            // Renderizar la vista con la lista de favoritos y el precio total
            res.render('songs/favourites.twig', { favourites, totalPrice });
        } catch (error) {
            res.send("Error al obtener la lista de favoritos: " + error);
        }
    });
    app.get('/songs/favourites/delete/:song_id', async (req, res) => {
        try {
            const songId = req.params.song_id;

            // Eliminar la canción favorita utilizando su ID
            await favouriteSongsRepository.deleteFavourite(songId);

            res.redirect('/songs/favourites'); // Redireccionar a la página de favoritos después de eliminar
        } catch (error) {
            res.send("Error al eliminar la canción favorita: " + error);
        }
    });
    app.get('/songs/favourites/add/:song_id', async (req, res) => {
        try {
            const songId = req.params.song_id;
            const song= await songsRepository.findSong({_id: new ObjectId((songId))},{});
            if (!song) {
                return res.send("No se encontró la canción con el ID proporcionado");
            }
            const favourite = {
                user: req.session.user,
                song_id: songId,
                title: song.title,
                price: song.price
            };
            await favouriteSongsRepository.addFavourite(favourite);

            res.redirect('back');
        } catch (error) {
            res.send("Error al añadir la canción a favoritos: " + error);
        }
    });
}

