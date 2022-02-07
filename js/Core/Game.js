class Game {
    constructor() {
        this.startScreen = new RegisterScreen();
        this.state = 0;
        this.play_screen = new PlayScreen();
    }

    setState(state){
        this.state = state;
    }

    #awaitLogin() {
        this.startScreen.live();
    }

    quit(){
        this.setState(2);
        deletePlayer(player.id, player.color);
    }

    onlogin(name, color) {
        player = new Player(0, 0, name, color);
        player.RegisterPlayer()
        OnlinePLayers.forEach(onlineplayer => {
            onlineplayer.color
        }); 
        this.startScreen.toggleHide()
        ListenToPlayers();
        this.setState(1);
    }    
    
    #play() {
        translate(canvas.width / 2 - player.x, canvas.height / 2 - player.y)
        rect(255, 255, 100, 100);
        this.play_screen.live();
        player.live();
        OnlinePLayers.forEach(otherplayer => {
            otherplayer.live();
        });
    }

    run() {
        if (this.state == 1) {
            this.#play();
        }
        else if (this.state == 2){
            console.log("you quit");
            this.play_screen.toggleHide();
            this.setState(3);
        }
        else{
            this.#awaitLogin();
        }
    }
}