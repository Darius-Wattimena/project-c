using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ProjectC.Helper
{
    public class UserSession
    {
        /// <summary>
        /// Returns the id (SID) of the user for the session of the given context
        /// </summary>
        /// <param name="context">The current HTTP context</param>
        public static int GetUserId(HttpContext context)
        {
            if (context.User.Identity is ClaimsIdentity identity)
            {
                int userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);
                return userId;
            }

            throw new Exception("User is not authenticated.");
        }

        /// <summary>
        /// Returns the role of the user for the session of the given context
        /// </summary>
        /// <param name="context">The current HTTP context</param>
        public static string GetUserRole(HttpContext context)
        {
            if (context.User.Identity is ClaimsIdentity identity)
            {
                return identity.FindFirst(ClaimTypes.Role).Value;
            }

            throw new Exception("User is not authenticated.");
        }

        /// <summary>
        /// Is the user session authenticated?
        /// </summary>
        public static bool IsAuthenticated(HttpContext context)
        {
            return context.User.Identity.IsAuthenticated;
        }
    }
}
