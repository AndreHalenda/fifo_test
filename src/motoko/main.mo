import Queue "./queue";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor {

    type Element = {
        telephone: Nat;
        text: Text;
    };

    var Fifo: Queue.Queue<Element> = Queue.nil();

    public func enqueue(data: Element) : async() {
        Debug.print(debug_show(data));
        return Fifo := Queue.enqueue(data, Fifo);
    };

    public func dequeue() : async ?Element {
        let (res, q0) = Queue.dequeue(Fifo);
        Fifo := q0;
        return res
    };
};
