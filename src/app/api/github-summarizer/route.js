import { NextResponse } from 'next/server';
import { apiKeyService } from '../../lib/api';

export async function POST(request) {
  try {
    const { githubUrl } = await request.json();
    const apiKey = request.headers.get('x-api-key');

    if (!apiKey) {
      return NextResponse.json(
        { message: 'API key is required' },
        { status: 401 }
      );
    }
    if (!githubUrl) {
      return NextResponse.json(
        { message: 'GitHub URL is required' },
        { status: 400 }
      );
    }

    // Validate the API key using your service
    const isValid = await apiKeyService.validateKey(apiKey);

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid API key' },
        { status: 401 }
      );
    }

    // Fetch and log the README content
    try {
      const readmeContent = await getGitHubReadme(githubUrl);
      console.log('Fetched README content:', readmeContent);
      return NextResponse.json(
        { readme: readmeContent },
        { status: 200 }
      );
    } catch (fetchError) {
      return NextResponse.json(
        { message: 'Failed to fetch README from GitHub' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in GitHub summarizer:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 

async function getGitHubReadme(githubUrl) {
  try {
    // Parse owner and repo from GitHub URL
    const urlParts = githubUrl.replace('https://github.com/', '').split('/');
    const owner = urlParts[0];
    const repo = urlParts[1];

    // Fetch readme content from GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3.raw'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch README');
    }

    const readmeContent = await response.text();
    return readmeContent;

  } catch (error) {
    console.error('Error fetching GitHub README:', error);
    throw error;
  }
}
