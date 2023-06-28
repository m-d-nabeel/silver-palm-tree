"use client";
import { getProviders, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import Button from "./Button";

type Provider = {
  id: string;
  name: string;
  type: string;
  signInUrl: string;
  callBackUrl: string;
  signInUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;

export default function AuthProviders() {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res: unknown = await getProviders();
      setProviders(res as Providers);
    };
    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <Button
            title="Sign In"
            handleClick={() => signIn(provider?.id)}
            key={i}
          />
        ))}
      </div>
    );
  }
}
