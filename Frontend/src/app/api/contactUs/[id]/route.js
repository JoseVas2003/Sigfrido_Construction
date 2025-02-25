import { NextResponse } from 'next/server';
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

//Where delete for admin will go