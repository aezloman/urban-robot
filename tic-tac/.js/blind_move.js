/*
 * private function: make the ai player take a blind move
 * that is: choose the cell to place its symbol randomly
 * @param turn [String]: the player to play, either X or O
 */
function takeABlindMove(turn) {
    var available = game.currentState.emptyCells();
    var randomCell = available[Math.floor(Math.random() * available.length)];
    var action = new AIAction(randomCell);

    var next = action.applyTo(game.currentState);

    ui.insertAt(randomCell, turn);

    game.advanceTo(next);
}
