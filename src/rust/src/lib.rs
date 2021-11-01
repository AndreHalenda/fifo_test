use ic_cdk_macros::*;

#[import(canister = "motoko")]
struct Motoko;

#[update]
async fn dispatch(telephone: &str, text: &str) -> () {
    let result = Motoko::enqueue({telephone; text}).await;
    return result
}