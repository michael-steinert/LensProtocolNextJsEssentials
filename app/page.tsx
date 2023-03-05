"use client";
import { Profile } from "@/interfaces/profile";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import api from "../api";

export default function Home() {
  const { client, recommendProfiles, getPublications, searchProfiles } = api;
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      // Method expects at two Arguments: a GraphQL Query String and an Object containing any Query Variables
      const response = await client.query(recommendProfiles, {}).toPromise();
      const profileData = await Promise.all(
        response.data.recommendedProfiles.map(async (profile: Profile) => {
          const pub = await client
            .query(getPublications, { id: profile.id, limit: 1 })
            .toPromise();
          profile.stats.totalPublications = pub.data.publications.items[0];
          return profile;
        })
      );
      setProfiles(profileData);
    } catch (error) {
      console.error("Error during Fetching recommended Profiles: ", error);
    }
  }

  async function searchForProfile() {
    try {
      const response = await client
        .query(searchProfiles, {
          query: searchString,
          type: "PROFILE",
        })
        .toPromise();
      const profileData = await Promise.all(
        response.data.search.items.map(async (profile: Profile) => {
          const publication = await client
            .query(getPublications, { id: profile.id, limit: 1 })
            .toPromise();
          profile.id = profile.id;
          profile.stats.totalPublications =
            publication.data.publications.items[0];
          return profile;
        })
      );

      setProfiles(profileData);
    } catch (error) {
      console.error("Error during Searching Profiles", error);
    }
  }

  console.log({ profiles });

  return (
    <div>
      <input
        placeholder="Search"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchString(event.target.value)
        }
        value={searchString}
      />
      <button onClick={searchForProfile}>SEARCH PROFILES</button>
      <div>
        {profiles.map((profile, index) => (
          <Link href={`/profile/${profile.id}`} key={index}>
            <a>
              {profile.picture ? (
                <img
                  src={profile.picture.original.url}
                  width={"52px"}
                  height={"52px"}
                />
              ) : (
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    backgroundColor: "black",
                  }}
                />
              )}
              <p>{profile.handle}</p>
              <p>{profile.metadata}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
