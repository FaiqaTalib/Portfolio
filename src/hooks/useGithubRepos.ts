import {useEffect, useState} from 'react';
import {PROFILE_DATA, type ProjectItem} from '../data/portfolioData';

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
}

const MATCH_KEYWORDS: Record<string, string[]> = {
  'vaccination-management': ['vaccin', 'health', 'patient', 'clinic'],
  'ecommerce-platform': ['ecom', 'e-com', 'shop', 'store', 'cart', 'laravel'],
  'movie-booking': ['movie', 'cinema', 'ticket', 'seat', 'booking'],
  'law-firm-cms': ['law', 'legal', 'attorney', 'firm', 'cms'],
  'wellness-platform': ['wellness', 'health', 'react', 'yoga', 'mind'],
};

function findMatchingRepo(projectId: string, repos: GithubRepo[]): GithubRepo | undefined {
  const keywords = MATCH_KEYWORDS[projectId] ?? [];
  return repos.find((repo) => {
    const haystack = `${repo.name} ${repo.description ?? ''}`.toLowerCase();
    return keywords.some((kw) => haystack.includes(kw));
  });
}

export function useGithubRepos(baseProjects: ProjectItem[]) {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepos() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${PROFILE_DATA.githubUsername}/repos?sort=updated&per_page=100`,
          {
            signal: controller.signal,
            headers: {Accept: 'application/vnd.github+json'},
          },
        );
        if (!response.ok) {
          setLoading(false);
          return;
        }
        const data = (await response.json()) as GithubRepo[];
        if (Array.isArray(data)) {
          setRepos(data.filter((repo) => !repo.fork));
        }
      } catch {
        // Silently keep CV defaults if offline or rate-limited
      } finally {
        setLoading(false);
      }
    }

    loadRepos();
    return () => controller.abort();
  }, []);

  const enrichedProjects: ProjectItem[] = baseProjects.map((project) => {
    const match = findMatchingRepo(project.id, repos);
    if (!match) return project;

    return {
      ...project,
      githubUrl: match.html_url,
      liveUrl: match.homepage && match.homepage.trim().length > 0 ? match.homepage : project.liveUrl,
      isLivePlaceholder: !(match.homepage && match.homepage.trim().length > 0),
      matchedRepoName: match.name,
      stars: match.stargazers_count,
    };
  });

  const githubAsProjects: ProjectItem[] = repos.map((repo) => ({
    id: `gh-${repo.id}`,
    title: repo.name.replace(/[-_]+/g, ' '),
    stack: repo.language ? [repo.language] : ['Repository'],
    summary:
      repo.description ??
      `Public repository from ${PROFILE_DATA.githubHandle}, updated ${new Date(
        repo.updated_at,
      ).toLocaleDateString('en-US', {month: 'short', year: 'numeric'})}.`,
    highlights: [
      `Repository: ${repo.name}`,
      repo.language ? `Primary Language: ${repo.language}` : 'Source code available on GitHub',
      `Last updated ${new Date(repo.updated_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}`,
    ],
    previewType: 'github',
    liveUrl: repo.homepage && repo.homepage.trim().length > 0 ? repo.homepage : repo.html_url,
    isLivePlaceholder: false,
    githubUrl: repo.html_url,
    matchedRepoName: repo.name,
    stars: repo.stargazers_count,
  }));

  return {enrichedProjects, githubAsProjects, loading, hasLiveRepos: repos.length > 0};
}
