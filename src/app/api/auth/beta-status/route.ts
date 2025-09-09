import { requireAuth, getCurrentUser } from "@/lib/auth/server-auth";
import { checkBetaAccess } from "@/lib/config/auth";
import { ApiError, createSuccessResponse, handleApiError, ErrorCode } from '@/lib/api';


export async function GET(request: Request) {
  try {
    await requireAuth();
    const { userAddress } = await getCurrentUser();
    
    const hasBetaAccess = await checkBetaAccess(userAddress!);
    
    return createSuccessResponse({ hasBetaAccess }, request);
  } catch (error) {
    return handleApiError(error, request);
  }
}