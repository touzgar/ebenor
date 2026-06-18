/**
 * Showroom API Client
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ShowroomContent {
  _id: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
  updatedAt: string;
  updatedBy?: string;
}

export interface ShowroomResponse {
  success: boolean;
  data: ShowroomContent;
  message?: string;
}

/**
 * Get showroom content (public)
 */
export async function getShowroomContent(): Promise<ShowroomResponse> {
  const response = await fetch(`${API_BASE_URL}/showroom`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch showroom content');
  }

  return response.json();
}

/**
 * Update showroom content (admin only)
 */
export async function updateShowroomContent(
  data: Partial<ShowroomContent>
): Promise<ShowroomResponse> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    if (!token) {
      throw new Error('Non authentifié. Veuillez vous reconnecter.');
    }

    const response = await fetch(`${API_BASE_URL}/showroom`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || `Erreur HTTP: ${response.status}`);
    }

    return responseData;
  } catch (error: any) {
    throw error;
  }
}
