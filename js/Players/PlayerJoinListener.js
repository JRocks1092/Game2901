function ListenToPlayers() {
    var players = database.ref('Players/');
    players.on("child_added", (PlayerData) => {
        var data = PlayerData.val();
        if (PlayerData.key !== player.id && PlayerData.exists()) {
            alert("Player "+PlayerData.key+" is Online!");
            var onilnePlayer = new Online_Player(data.x_pos, data.y_pos, data.name, data.color);
            onilnePlayer.id = PlayerData.key;
            onilnePlayer.create();
            OnlinePLayers.push(onilnePlayer);            
        }
    });
}