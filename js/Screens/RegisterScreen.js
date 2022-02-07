var PlayerName = "";

class RegisterScreen {
    constructor() {
        this.input = createInput("Name");
        this.play_Button = createButton('Play');
        this.title = createElement('h2');
        this.input.input(this.#GetName);
        this.Name = "";
    }

    #GetName() {
        PlayerName = this.value();
    }

    toggleHide(){
        this.title.hide()
        this.play_Button.hide()
        this.input.hide()
    }

    #display() {
        this.title.html("GAME 2901");
        this.title.position(350, 50);
        this.title.style('font-size', '70px');
        this.title.style('color', 'skyblue');
        this.input.position(550, 400);
        this.input.style('width', '200px');
        this.input.style('height', '20px');
        this.input.style('background', 'lavender');
        this.play_Button.position(560, 500);
        this.play_Button.style('width', '200px');
        this.play_Button.style('height', '40px');
        this.play_Button.style('background', 'lightpink');
    }

    #run() {        
        this.play_Button.mousePressed(() => {            
            this.#login();
        });
    }

    async #login() {
        if (await isServerNotInMaxCapacity()) {
            game.onlogin(PlayerName, this.#getrandcolor());
        }        
    }

    #getrandcolor() {
        var i = Math.round(random(0, availableColors.length));
        return availableColors[i];
    }

    live() {
        this.#display();
        this.#run();
    }
}