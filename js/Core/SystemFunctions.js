function findOfflinePlayers(callback) {
    var ref = database.ref("Players/");
    ref.once('value', (allplayers) => {
        allplayers.forEach((onlineplayer) => {
            const DateToMilliseconds = 900000;
            if (Date.now() < parseInt(onlineplayer.val().last_upt_time) + DateToMilliseconds){
                deletePlayer(onlineplayer.key, onlineplayer.val().color);
            }
        });
    });
}

async function deletePlayer(playerID, color){
    await database.ref("Players/"+playerID+"/").remove();
    var ref = database.ref("Game/");
    var colors = [];
    var playerOnline = 0;
    await ref.once("value", (data) => {
        colors = data.val().used_colors.split(",");
        playerOnline = parseInt(data.val().Players_Online);
    });
    colors.splice(colors.indexOf(color), 1);
    playerOnline -= 1;
    var colorstr = "";
    for(const i in colors){
        colorstr += colors[i];
        if(i != (colors.length-1)){
            colorstr += ",";
        }
    }

    await database.ref("Game/").update({
        used_colors:colorstr,
        Players_Online:playerOnline
    });
}

function isServerNotInMaxCapacity() {
    var colors = [];
    var playerOnline = 0;
    var ref = database.ref("Game/");
    var retval = false;
    ref.once("value", (data) => {
        colors = data.val().used_colors != null?data.val().used_colors.split(","):[""];
        playerOnline = parseInt(data.val().Players_Online);
    });
    if (parseInt(playerOnline) <= 10) {
        for (const i in PLAYER_COLORS) {
            if (!colors.includes(PLAYER_COLORS[i])) {                
                availableColors.push(PLAYER_COLORS[i]);
            }
        }
        retval = true;
    }

    return retval;
}