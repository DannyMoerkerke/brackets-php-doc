/*
 * Copyright (c) 2014 Danny Moerkerke <danny@dannymoerkerke.nl>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


/*jslint vars: true, plusplus: true, devel: true, nomen: true,  regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets */

define(function (require, exports, module) {
    "use strict";

    // Brackets modules
    var CommandManager      = brackets.getModule("command/CommandManager"),
        EditorManager       = brackets.getModule("editor/EditorManager"),
        KeyBindingManager   = brackets.getModule("command/KeyBindingManager"),
        Menus               = brackets.getModule("command/Menus"),
        NativeApp           = brackets.getModule("utils/NativeApp");


    // Constants
    var NAVIGATE_LOOKUP_ON_PHP_NET  = "Lookup on PHP.net",
        CMD_LOOKUP_ON_PHP_NET    = "dannymoerkerke.lookupOnPhpNet";

    // Vars
    var query;
    
    // build query and navigate to documentation
    function _loadDocumentation() {

        var url = "http://php.net/",
            editor = EditorManager.getActiveEditor(),
            sel;

        if (!editor) {
            return null;
        }


        sel = editor.getSelection();
        if (sel.start.line !== sel.end.line) {
            return null;
        }

        query = editor.getSelectedText();

        if (!query) {
            editor.selectWordAt(sel.start);
            query = editor.getSelectedText().replace("_", "-");
        }
        url += query;

        NativeApp.openURLInDefaultBrowser(url);

    }


   // Add command
    function _handleLookupOnPhpNet() {
        _loadDocumentation();
    }


    // Register the command and shortcut
    CommandManager.register(
        NAVIGATE_LOOKUP_ON_PHP_NET,
        CMD_LOOKUP_ON_PHP_NET,
        _handleLookupOnPhpNet
    );
    KeyBindingManager.addBinding(CMD_LOOKUP_ON_PHP_NET, "Alt-P");

    // Create a menu item bound to the command
    var menu = Menus.getMenu(Menus.AppMenuBar.NAVIGATE_MENU);
    menu.addMenuItem(CMD_LOOKUP_ON_PHP_NET);
});
