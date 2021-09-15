
/**
 *  created by Mat Terry
 *  Resources:
 *      Bootstrap: https://getbootstrap.com/docs/5.1/components/alerts/
 * @returns 
 */
export function Success() {
    return(
        <div class="alert alert-success d-flex align-items-center" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                <div>
                    Congratulations! You're a winner!!
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
    return(
        <div class="alert alert-danger d-flex align-items-center" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                    Oh No! You're a failure! :(
                </div>
        </div>
    );
}