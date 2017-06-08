/**
*原理：将key作为Object对象的property，
*           value则是该property对应的值
*
*    var obj = new Object();
*          obj.name = "yhef";          //可以把name理解为key,对应的value就是：yhef;
*          obj.name = "163blog";   //输入相同的key时，则替换对应的value，替换后就成了：163blog;
*/
function JsMap()
{//前导标识符
    var prefixStr = "MAP_PREFIX_";
    //Map大小 
    var length = 0;  
    //map的核心对象 
    var entry = new Object();  
      
    // 是否包含 Key 
    this.containsKey = function(k)  
    {  
        return (prefixStr+k in entry);  
    }
   
    //存 
    this.put = function (k,v)  
    {  
        if(!this.containsKey(k))  
          length ++ ;  
        entry[prefixStr+k] = v;  
    }  
      
    //取
    this.get = function (k)  
    {  
        return this.containsKey(k) ? entry[prefixStr+k] : null;  
    }  
      
    //删除 
    this.remove = function (k)  
    {  
        if( this.containsKey(k) && ( delete entry[prefixStr+k] ) )  
            length --;  
    }  
      
    //Key数组,类似java.util.Map.keySet();  
    this.keys = function ()  
    {  
        var keys = new Array();  
        for(var prop in entry)  
        {  
        	prop = prop.replace(prefixStr,"");
            keys.push(prop);  
        }  
        return keys;  
    } 
      
    //Map大小 
    this.size = function ()  
    {  
        return length;  
    }  
      
    //清空 
    this.clear = function ()  
    {  
        length = 0;  
        entry = new Object();  
    } 
    }