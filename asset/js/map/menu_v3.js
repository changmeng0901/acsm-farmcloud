 
 function hasClass(target, name) {
     return target.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
 }
 
 function removeClass(target, name) {
     if (hasClass(target, name)) {
         target.className = target.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ' ');
     }
 }
 
 function addClass(target, name) {
     if (!hasClass(target, name)) {
         target.className += " " + name;
     }
 }
 
 function MenuControl(map) {
     this.container = document.createElement("div");
     this.coordinate = null;
     this.map = map;
     this.sender = null
     this.isEnable = true;
     this.container.className = "menu_casing";
     this.hide();
     this.items = new Array();
     var self = this;
     google.maps.event.addListener(map, "click", function() {
         self.hide();
     });
     google.maps.event.addListener(map, "movestart", function() {
         self.hide();
     });
     google.maps.event.addListener(map, "zoom_changed", function() {
         self.hide();
     });
     google.maps.event.addListener(map, "dragstart", function() {
         self.hide();
     });
     this.container.index = 1;
     map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.container);
 }
 
 MenuControl.prototype.reset = function() {
	 this.container.innerHTML="";
 }
 
 MenuControl.prototype.show = function() {
     this.container.style.display = "block";
     for (var i = 0; i < this.items.length; i++) {
         this.items[i].show();
     }
 }
 
 MenuControl.prototype.hide = function() {
     this.container.style.display = "none";
     this.items = new Array();
 }
 
 MenuControl.prototype.enable = function() {
     this.isEnable = true;
 }
 
 MenuControl.prototype.disable = function() {
     this.isEnable = false;
 }
 
 MenuControl.prototype.isHide = function() {
     return (this.container.style.display == "none");
 }
 
 MenuControl.prototype.addItem = function(item) {
     item.host = this;
     this.items.push(item);
     this.container.appendChild(item.casing);
 }
 
 MenuControl.prototype.addSeparator = function(group) {
     var separator = group || new MenuSeparator();
     if (typeof group == "string") {
         separator = new MenuSeparator(group);
     }
     this.items.push(separator);
     this.container.appendChild(separator.casing);
 }
 
 
 function MenuSeparator(groupName) {
     this.groupName = groupName;
     this.casing = document.createElement("div");
     this.casing.className = "menu_separator";
 }
 
 MenuSeparator.prototype.show = function() {
     this.casing.style.display = "block";
 }
 
 MenuSeparator.prototype.hide = function() {
     this.casing.style.display = "none";
 }
 
 function MenuItem(options) {
     options = options || {};
     this.text = options.text || "";
     this.icon = options.icon;
     this.handler = options.handler;
     this.groupName = options.groupName;
     this.host = null; //宿主
 
     this.casing = document.createElement("div");
     this.casing.className = "menu_item";
 
     var menu_text = document.createElement("div");
     menu_text.className = "menu_text";
     var text_lable = document.createElement("span");
     text_lable.innerHTML = this.text;
     menu_text.appendChild(text_lable);
     this.casing.appendChild(menu_text);
 
     var self = this;
     if (this.icon) {
         var item_icon = document.createElement("div");
         item_icon.className = "menu_icon";
         item_icon.style.backgroundImage = "url(" + self.icon + ")";
         item_icon.style.width="10px";
         item_icon.style.height="10px";
         self.casing.appendChild(item_icon);
     }
 
     if (typeof self.handler == "function") {
         google.maps.event.addDomListener(self.casing, "click", function() {
             if (self.host) {
                 self.handler(self.host.coordinate);
                 self.host.hide();
             }
         });
     }
     google.maps.event.addDomListener(self.casing, "mouseover", function() {
         addClass(self.casing, "item_active");
     });
 
     google.maps.event.addDomListener(self.casing, "mouseout", function() {
         removeClass(self.casing, "item_active");
     });
 }
 
 MenuItem.prototype.show = function() {
     this.casing.style.display = "block";
 }
 
 MenuItem.prototype.hide = function() {
     this.casing.style.display = "none";
 }