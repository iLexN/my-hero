/* global nw, ac1, app, ac2*/
var win = nw.Window.get();

var menu = new nw.Menu({type: 'menubar'});

// Create a submenu as the 2nd level menu
var submenu = new nw.Menu();
submenu.append(new nw.MenuItem({ 
    label: 'Cleanup Database'  ,
    click : function(){
        ac1.dbClear();
        ac2.dbClear();
    }
}));
submenu.append(new nw.MenuItem({ 
    label: 'Reset Database' ,
    click : function(){
        ac1.dbRemove();
        ac2.dbRemove();
    }
}));

var menu2 = new nw.Menu({type: 'menubar'});
var submenu2 = new nw.Menu();
submenu2.append(new nw.MenuItem({ 
    label: 'iLexN'  ,
    click : function(){
        app.setFilterAC('iLexN');
        app.filterTags = '';
        app.filterTags2 = '';
        $("button").removeClass('red');
    }
}));
submenu2.append(new nw.MenuItem({ 
    label: 'iLexSo7'  ,
    click : function(){
        app.setFilterAC('iLexSo7');
        app.filterTags = '';
        app.filterTags2 = '';
        $("button").removeClass('red');
    }
}));


// Create and append the 1st level menu to the menubar
menu.append(new nw.MenuItem({
  label: 'Database',
  submenu: submenu
}));
menu.append(new nw.MenuItem({
  label: 'Choose AC',
  submenu: submenu2
}));

// Assign it to `window.menu` to get the menu displayed
nw.Window.get().menu = menu;