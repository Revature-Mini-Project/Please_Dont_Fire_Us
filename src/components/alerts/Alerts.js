import useSound from "use-sound";
// sounds
import success from '../../sounds/success.mp3';
import failure from '../../sounds/failure.mp3';


/**
 *  created by Mat Terry
 *  Resources:
 *      Bootstrap: https://getbootstrap.com/docs/5.1/components/alerts/
 * @returns 
 */
export function Success() {
    const [playSuccess] = useSound(success);
    
    return(
        <div >{playSuccess}
            <div class="alert alert-success d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                    <div>
                        Congratulations! You're a winner!!
                    </div>
            </div>
        </div>
    )
}

/**
 *  created by Mat Terry
 *  Resources:
 *      Bootstrap: https://getbootstrap.com/docs/5.1/components/alerts/
 * @returns 
 */
export function Failure() {
    const [playFailure] = useSound(failure);

    return(
        <div>{playFailure}
            <div class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                    <div>
                        Oh No! You're a failure! :(
                    </div>
            </div>
        </div>
    );
}