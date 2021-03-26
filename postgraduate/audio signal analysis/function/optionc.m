function enLFandHF_orig_phS = optionc(segOrig_phS)
en = [];
%UNTITLED5 Summary of this function goes here
%   Detailed explanation goes here
    x = size(segOrig_phS);
    %disp(x(1));
    enLFandHF_orig_phS = [];
    for i = 1:x(1)
        %S_Length = length(segOrig_phS(i,:));
        y = fft(segOrig_phS(i,:),8000);
        y2 = fft(segOrig_phS(i,:));
        seg = y(1:4000);
        seg2 = abs(seg);
        y3 = abs(y2);
        %seg3 = seg2/S_Length;
        seg4 = seg2.^2;
        y4 = y3.^2;
        
        AvgPowerF = mean(10*log10(seg4(1:2000)));
        AvgPowerB = mean(10*log10(seg4(2001:4000)));

        enLFandHForigphS = [enLFandHF_orig_phS;[AvgPowerF AvgPowerB]];
        enLFandHF_orig_phS = enLFandHForigphS;
        %plot(20*log10(seg4));

    end
    
end

