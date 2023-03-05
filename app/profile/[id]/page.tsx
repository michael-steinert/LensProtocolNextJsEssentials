"use client";
import { Profile } from "@/interfaces/profile";
import { Item, Publication } from "@/interfaces/publication";
import { Contract, ethers } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ABI from "../../../abi.json";
import api from "../../../api";

// Lens Protocol Contract on Polygon
const CONTRACT_ADDRESS = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";

export default function Profile() {
  const { client, getPublications, getProfiles } = api;
  const [profile, setProfile] = useState<Profile>();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [account, setAccount] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id]);

  async function fetchProfile() {
    try {
      const returnedProfile = await client
        .query(getProfiles, { id })
        .toPromise();
      const profileData = returnedProfile.data.profiles.items[0];
      setProfile(profileData);

      const pubs = await client
        .query(getPublications, { id, limit: 50 })
        .toPromise();

      setPublications(pubs.data.publications.items);
    } catch (err) {
      console.log("error fetching profile...", err);
    }
  }

  async function connectWallet() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("accounts: ", accounts);
    accounts[0];
    setAccount(account);
  }

  async function followUser() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    // Connected to a Signer that can make State-changing Transactions, which will cost the Account ETH
    const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);

    try {
      const tx = await contract.follow([id], [0x0]);
      await tx.wait();
      console.log(`Successfully followed ${profile?.handle}`);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  if (!profile) return null;

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <button onClick={connectWallet}>Sign In</button>
        <Image
          width={200}
          height={200}
          alt="Profile"
          src={profile.picture?.original?.url}
        />
        <p>{profile.handle}</p>
        {publications.map((publication: Publication, index: number) => (
          <div key={index}>
            {publication.items.map((item: Item, i: number) => (
              <div key={i}>
                <p>{item.metadata.content}</p>
              </div>
            ))}
          </div>
        ))}
        <button onClick={followUser}>Follow User</button>
      </div>
    </div>
  );
}
