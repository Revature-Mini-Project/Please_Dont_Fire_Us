const storageLocation = "simon.user.input.keybindings";
/**
 * Creates registers the given keypress
 * 
 * @argument inputs A 2D array of [key, value] pairs, each pair should contain the unique name of a key as per KeyboardEvent.key, and a callback function to recieve
 * the key event for the specified key. The actual key may be changed by the user, but will always call the same function. Do not use the key specified by the event
 * to determine what action to take, each key must have a unique callback function.
 * 
 * @return A 2D array of functions, each element contains a pair, the first function in the pair returns the name of the key currently bound to the callback function,
 * the second function rebinds the function to a new key.
 */
export default function registerKeyInputListeners(...inputs){
    
    const onPresses = new Map(),
          keybindings = new Map(),
          keyLookups = new Map(),
          keyControllers = [];
    let setKey = null;
    
    function bindKey(mainKey, newKey, resolve = () => {}){
         
        const curentKey = keybindings.get(mainKey);
        
        if(newKey === curentKey){
            
            setKey = null;
            
            return resolve(newKey);
            
        }
            
        if(keyLookups.has(newKey))
            return alert(`${newKey} is already in use.`);
    
        keyLookups.delete(curentKey);
        keybindings.set(mainKey, newKey);
        keyLookups.set(newKey, mainKey);
        setKey = null;
        
        try{
            
            window.localStorage.setItem(storageLocation, JSON.stringify(Object.fromEntries(keybindings)));
            
        }finally{
            
            resolve(newKey);
            
        }
        
    }
    
    inputs.forEach(input => {
        
        const mainKey = input[0];
        onPresses.set(mainKey, input[1]);
        keybindings.set(mainKey, mainKey);
        keyLookups.set(mainKey, mainKey);
        
        keyControllers.push([() => {
            
            return keybindings.get(mainKey);
            
        },
        () => {
            
            return new Promise((resolve) => {
                
                setKey = newKey => {
                    
                    bindKey(mainKey, newKey, resolve);
                    
                };
                
            });
            
        }]);
        
    });
    
    try{
        
        const savedKeys = window.localStorage.getItem(storageLocation);
        
        if(savedKeys){
            
            const savedKeybindings = new Map(Object.entries(JSON.parse(savedKeys)));
            
            keybindings.forEach((boundKey, mainKey) => {
                
                if(savedKeybindings.has(mainKey))
                    bindKey(mainKey, savedKeybindings.get(mainKey));
                
            });
            
        }
        
    }catch(err){
        
        console.warn(err);
        
    }
    
    document.addEventListener("keydown", event => {
        
        if(setKey){
            
            setKey(event.key);
            
            return;
            
        }
        
        const callBack = onPresses.get(keyLookups.get(event.key));
        
        if(callBack)
            callBack(event);
        
    });
    
    return keyControllers;
    
}
