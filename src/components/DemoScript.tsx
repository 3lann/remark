"use client";

import { useEffect } from "react";

export default function DemoScript() {
    useEffect(() => {
        if (typeof window !== "undefined" && window.location.search.includes("demo=1")) {
            const runDemo = async () => {
                // Wait for page to fully render
                await new Promise(r => setTimeout(r, 2000));

                // 1. First message: Intro + New Era
                window.dispatchEvent(new CustomEvent("assistant-message", {
                    detail: { text: "أهلاً بك! أنا مساعد ريمارك. اليوم نعلن عن حقبة جديدة كلياً في عالمنا. 👋", delay: 0 }
                }));

                // Wait enough time to read the first message
                await new Promise(r => setTimeout(r, 3200));

                // 2. Second message: Era doesn't start without you
                window.dispatchEvent(new CustomEvent("assistant-message", {
                    detail: { text: "وهذه الحقبة الجديدة بكل تأكيد لا تبدأ ولا تكتمل إلا معكم وبقدراتكم! 🚀", delay: 0 }
                }));
                await new Promise(r => setTimeout(r, 3200));

                // 3. Third message: Direct to jobs
                window.dispatchEvent(new CustomEvent("assistant-message", {
                    detail: { text: "اليوم راح أشرح لكم أسهل طريقة للتقديم كفري لانس معنا في ثواني معدودة. 💼", delay: 0 }
                }));
                await new Promise(r => setTimeout(r, 3200));

                // 4. Fourth message: Click action 
                window.dispatchEvent(new CustomEvent("assistant-message", {
                    detail: { text: "كل اللي عليك تسويه هو الضغط على زر 'فرص العمل الحر' لمشاهدة واختيار تخصصك.", delay: 0 }
                }));
                await new Promise(r => setTimeout(r, 2800));

                // 5. Visually trigger UI elements based on viewport
                let targetBtn = document.getElementById("demo-desktop-jobs-btn");
                const burger = document.getElementById("demo-hamburger-btn");
                const isMobile = burger && window.getComputedStyle(burger).display !== "none";

                if (isMobile) {
                    burger.click();
                    await new Promise(r => setTimeout(r, 1200));
                    targetBtn = document.getElementById("demo-mobile-jobs-btn");
                }

                if (targetBtn) {
                    targetBtn.style.transition = "all 0.4s ease";
                    targetBtn.style.transform = "scale(1.08)";
                    targetBtn.style.boxShadow = "0 0 35px rgba(139, 92, 246, 0.9), inset 0 0 15px rgba(139, 92, 246, 0.4)";
                    targetBtn.style.backgroundColor = "rgba(139, 92, 246, 0.3)";
                    targetBtn.style.borderRadius = "14px";

                    // Allow the user to see the highlight effect clearly
                    await new Promise(r => setTimeout(r, 1200));

                    // Simulate the physical press down
                    targetBtn.style.transition = "all 0.1s ease";
                    targetBtn.style.transform = "scale(0.95)";
                    await new Promise(r => setTimeout(r, 150));
                }

                await new Promise(r => setTimeout(r, 450));

                // Redirect dynamically to start Scene 2
                window.location.href = "/jobs?demo=1";
            };
            runDemo();
        }
    }, []);

    return null;
}
