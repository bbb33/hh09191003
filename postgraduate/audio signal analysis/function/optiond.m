function [DL,avgL,DH,avgH] = optiond(enHFandLF)
 enLF = enHFandLF(:,1);
 enHF = enHFandLF(:,2);
 x = length(enHFandLF(:,1));
%UNTITLED6 Summary of this function goes here
%   Detailed explanation goes here

        DL =  var(enLF)*(x-1)/x;
        avgL = mean(enLF);
       
        DH =  var(enHF)*(x-1)/x;
        avgH = mean(enHF);

        
end

