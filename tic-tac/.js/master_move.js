*
 * private function: make the ai player take a master move,
 * that is: choose the optimal minimax decision
 * @param turn [String]: the player to play, either X or O
 */
function takeAMasterMove(turn) {
    var available = game.currentState.emptyCells();

    //enumerate and calculate the score for each avaialable actions to the ai player
    var availableActions = available.map(function(pos) {
        var action =  new AIAction(pos); //create the action object

        //get next state by applying the action
        var next = action.applyTo(game.currentState);

        //calculate and set the action's minmax value
        action.minimaxVal = minimaxValue(next);

        return action;
    });

    //sort the enumerated actions list by score
    if(turn === "X")
        //X maximizes --> descend sort the actions to have the largest minimax at first
        availableActions.sort(AIAction.DESCENDING);
    else
        //O minimizes --> acend sort the actions to have the smallest minimax at first
        availableActions.sort(AIAction.ASCENDING);


    //take the first action as it's the optimal
    var chosenAction = availableActions[0];
    var next = chosenAction.applyTo(game.currentState);

    // this just adds an X or an O at the chosen position on the board in the UI
    ui.insertAt(chosenAction.movePosition, turn);

    // take the game to the next state
    game.advanceTo(next);
}
