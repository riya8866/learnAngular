import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

//req is the original req which we are modifying

  const token = localStorage.getItem("angular19Token")
  const newReq= req.clone({            //cloning original req
    setHeaders:{                           //adding header to the new req
      Authorization:`Bearer ${token}`       
    }
  })

  return next(newReq);                  //returning the modified request
};
