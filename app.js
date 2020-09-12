new Vue({
    el: "#app",
    data: {
        monstarHealth: 100,
        playerHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.monstarHealth =  100;
            this.playerHealth = 100;
        },
        attack: function(){
            var damage = this.calculateDamage(3,10);
            this.monstarHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Player Hits Monstar for "+ damage 
            });
            if (this.checkwin()){
                return;
            }
            this.monstarAttack();
        },
        specialAttack: function(){
            var damage = this.calculateDamage(3,10);
            this.monstarHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Player Hits Hard Monstar for "+ damage 
            });
            if (this.checkwin()){
                return;
            }
            this.monstarAttack();
        },
        heal: function(){
            if (this.playerHealth <+ 90){
                this.playerHealth += 10;
            }else{
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: "Player Heals 10" 
            });
            this.monstarAttack();
        },
        giveUp: function(){
            this.gameIsRunning = false;
        },
        monstarAttack: function(){
            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;            
            this.turns.unshift({
                isPlayer: false,
                text: "Monstar Hits Player for "+ damage 
            });

            this.checkwin();
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max)+1, min);
        },
        checkwin: function(){
            if (this.monstarHealth <= 0){
                if (confirm("You Won! New Game?")){
                    this.startGame();
                }else{
                    this.gameIsRunning= false;
                }
                return true;
            }else if (this.playerHealth <= 0){
                if (confirm("You Lost! New Game?")){
                    this.startGame();
                }else{
                    this.gameIsRunning= false;
                }
                return true;
            }
            return false;
        }
    }
});