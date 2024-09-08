'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import { Button, Image } from '@nextui-org/react';
import { retrievePublicUrl, uploadFile } from '@/lib/supabaseFile';

export default function UploadFile() {
  const handleAuth = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: 'imankitkalirawana@gmail.com',
      password: '007@AnKiT'
    });
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          handleAuth();
        }}
      >
        login
      </Button>
    </div>
  );
}
