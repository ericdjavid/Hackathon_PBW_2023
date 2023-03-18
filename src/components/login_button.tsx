import React, { useCallback, useState } from 'react'
import {getAddress, isConnected, getNFT } from "@gemwallet/api";

export default function loginButton() {
    return ( <button onclick="connect()" class="waves-effect waves-light btn">
    Login with GemWallet
  </button>)
}