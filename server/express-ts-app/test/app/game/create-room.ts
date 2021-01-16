import test from "ava";
import { response } from "express";
import axios from "axios";
import { isMainThread } from "worker_threads";
import { default as jwt } from "jsonwebtoken";
import getSecretKey from "../../../src/utils/auth/secretKey";
import {
  createRoomReqBody,
  jwtPayloadCreateRoom,
  responseBody,
} from "../../../src/utils/interfaces/create-room-interfaces";
const fn = () => "foo";

test("create-room returns the correct information", async (t) => {
  let reqBody: createRoomReqBody = {
    name: "testBot",
  };

  let data = await axios.post(
    "http://localhost:8080/api/create-room",
    reqBody
  );
  let result: responseBody = data.data;

  t.false(false);
  t.true(true);

  t.assert(result.success != null);
  if (result.success == true) {
    t.assert(result.jwt != null);
    let payload = jwt.verify(
      result.jwt.toString(),
      getSecretKey()
    ) as jwtPayloadCreateRoom;

    t.assert(payload.room != null);
    t.assert(payload.name == "testBot");
  }
});
