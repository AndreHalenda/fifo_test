import { Actor, HttpAgent } from "@dfinity/agent";
import motoko from 'ic:canisters/motoko';
import fetch from 'node-fetch'
import { idlFactory } from './fifo.did.js'
import dotenv from 'dotenv'
import twilio from 'twilio'

dotenv.config()
const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN
const twilioTelephone = process.env.TWILIO_TELEPHONE

global.fetch = fetch
const client = twilio(accountSid, authToken)

//replace with any canister id
const canisterId = process.env.MOTOKO_CANISTER_ID

const agent = new HttpAgent({
  host: "http://localhost:8000",
});
// not to prod
agent.fetchRootKey();

const actor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});


export const callCanister = async (message) => {
  return await actor.greet(message).catch(e => { return "Error " + e });
}

export const enQueue = async (data) => {
  try {
    await actor.enqueue(data).catch(e => { return "Error " + e });
  } catch (error) {
    throw new Error(error)
  }
  return true
}

export const deQueue = async () => {
  try {
    const data = await actor.dequeue()
    await client.calls
      .create({
        body: data.text,
        to: data.telephone,
        from: twilioTelephone,
      })
    return
  } catch (error) {
    throw new Error(error)
  }
}

export const innerEnQueue = async (data) => {
  try {
    await motoko.enqueue(data);
  } catch (error) {
    throw new Error(error)
  }
  return true
}

export const innerDeQueue = async () => {
  try {
    const data = await motoko.dequeue()
    await client.calls
      .create({
        body: data.text,
        to: data.telephone,
        from: twilioTelephone,
      })
    return
  } catch (error) {
    throw new Error(error)
  }
}
