import List "mo:base/List";
import Debug "mo:base/Debug";

module {

    type List<T> = List.List<T>;

    public type Queue<T> = (List<T>, List<T>);

    public func nil<T>() : Queue<T> { 
        (List.nil<T>(), List.nil<T>());
    };

    public func isEmpty<T>(q: Queue<T>) : Bool {
        switch (q) {
            case ((null, null)) true;
            case ( _ )          false;
        };
    };

    public func size<T>(q: Queue<T>) :  Nat {
        List.size(q.0) + List.size(q.1);
    };
    
    public func enqueue<T>(v: T, q:Queue<T>) : Queue<T> {
        (?(v, q.0), q.1 );
    };

    public func dequeue<T>(q:Queue<T>) : (?T, Queue<T>) {
        switch (q.1) {
        case (?(h, t)) {
            return ( ?h, (q.0, t) );
        };
        case null {
            switch (q.0) {
            case (?(h, t)) {
                let swapped = ( List.nil<T>(), List.reverse<T>(q.0) );
                return dequeue<T>(swapped);
            };
            case null {
                return ( null, q );
            };
            };
        };
        };
    };
};