/*
 * private function: make the ai player take a novice move,
 * that is: mix between choosing the optimal and suboptimal minimax decisions
 * @param turn [String]: the player to play, either X or O
 */
function takeANoviceMove(turn) {
    var available = game.currentState.emptyCells();

    //enumerate and calculate the score for each available actions to the ai player
    var availableActions = available.map(function(pos) {
        var action =  new AIAction(pos); //create the action object

        //get next state by applying the action
        var nextState = action.applyTo(game.currentState);

        //calculate and set the action's minimax value
        action.minimaxVal = minimaxValue(nextState);

        return action;
    });

    //sort the enumerated actions list by score
    if(turn === "X")
        //X maximizes --> decend sort the actions to have the maximum minimax at first
        availableActions.sort(AIAction.DESCENDING);
    else
        //O minimizes --> ascend sort the actions to have the minimum minimax at first
        availableActions.sort(AIAction.ASCENDING);


    /*
     * take the optimal action 40% of the time
     * take the 1st suboptimal action 60% of the time
     */
    var chosenAction;
    if(Math.random()*100 <= 40) {
        chosenAction = availableActions[0];
    }
    else {
        if(availableActions.length >= 2) {
            //if there is two or more available actions, choose the 1st suboptimal
            chosenAction = availableActions[1];
        }
        else {
            //choose the only available actions
            chosenAction = availableActions[0];
        }
    }
    var next = chosenAction.applyTo(game.currentState);

    ui.insertAt(chosenAction.movePosition, turn);

    game.advanceTo(next);
};
